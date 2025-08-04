from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
from datetime import datetime
import random
import requests

class ActionValidarProblema(Action):
    def name(self) -> Text:
        return "action_validar_problema"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        equipo = tracker.get_slot("equipo")
        ubicacion = tracker.get_slot("ubicacion")

        # Base de conocimiento de equipos y ubicaciones
        equipos_validos = {
            "proyector": "equipo audiovisual",
            "cañón proyector": "equipo audiovisual",
            "computadora": "equipo informático",
            "impresora": "equipo periférico",
            "internet": "conectividad",
            "servidor": "infraestructura",
            "aire acondicionado": "climatización",
            "software": "aplicación"
        }
        
        ubicaciones_validas = ["aula", "laboratorio", "oficina", "sala", "auditorio"]

        # Validación de equipo
        if equipo:
            equipo_normalizado = next(
                (k for k in equipos_validos if k in equipo.lower()),
                None
            )
            
            if not equipo_normalizado:
                dispatcher.utter_message(
                    text=f"Lo siento, no reconozco el equipo '{equipo}'. "
                         f"Los equipos válidos son: {', '.join(equipos_validos.keys())}"
                )
                return [SlotSet("equipo", None)]
            
            # Actualizar slot con nombre normalizado
            equipo = equipo_normalizado

        # Validación de ubicación
        if ubicacion and not any(u in ubicacion.lower() for u in ubicaciones_validas):
            dispatcher.utter_message(
                text=f"La ubicación '{ubicacion}' no parece válida. "
                     f"Por favor especifica aula, laboratorio, oficina, etc."
            )
            return [SlotSet("ubicacion", None)]
        
        return [SlotSet("equipo", equipo), SlotSet("ubicacion", ubicacion)]

class ActionCrearTicket(Action):
    def name(self) -> Text:
        return "action_crear_ticket"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Extraer información
        equipo = tracker.get_slot("equipo")
        ubicacion = tracker.get_slot("ubicacion") or "Ubicación no especificada"
        user_message = tracker.latest_message.get('text')
        sender_id = tracker.sender_id
        
        # Generar número de ticket (en producción usar API)
        num_ticket = f"HD-{random.randint(1000, 9999)}-{datetime.now().strftime('%m%d')}"
        
        # Simular categorización
        categorias = {
            "equipo audiovisual": "AUD",
            "equipo informático": "INF",
            "conectividad": "RED",
            "infraestructura": "INFRA",
            "climatización": "CLIM"
        }
        
        categoria = categorias.get(
            next(
                (v for k, v in equipos_validos.items() if k in equipo.lower()),
                "GEN"
            )
        )
        
        # Conectar con API real (ejemplo comentado)
        """
        try:
            response = requests.post(
                "https://api.emi.edu.bo/tickets",
                json={
                    "numero": num_ticket,
                    "descripcion": f"{equipo} en {ubicacion}: {user_message}",
                    "categoria": categoria,
                    "prioridad": "media",
                    "usuario": sender_id,
                    "estado": "pendiente"
                },
                headers={"Authorization": "Bearer YOUR_API_KEY"}
            )
            if response.status_code != 201:
                num_ticket = "Error-API"
        except Exception as e:
            num_ticket = "Error-Conexion"
        """
        
        # Actualizar slots
        return [
            SlotSet("num_ticket", num_ticket),
            SlotSet("equipo", equipo),
            SlotSet("ubicacion", ubicacion),
            SlotSet("fecha_actualizacion", datetime.now().strftime("%d/%m/%Y %H:%M"))
        ]

class ActionConsultarEstado(Action):
    def name(self) -> Text:
        return "action_consultar_estado"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        num_ticket = tracker.get_slot("num_ticket")
        
        # Simular base de datos de tickets
        tickets_db = {
            "HD-1234": {"estado": "en progreso", "tecnico": "Juan Pérez", "comentario": "El técnico está diagnosticando el problema"},
            "HD-5678": {"estado": "pendiente", "tecnico": "", "comentario": "En cola para asignación"},
            "HD-9012": {"estado": "resuelto", "tecnico": "María Gómez", "comentario": "Problema solucionado. Pendiente verificación del usuario"}
        }
        
        if num_ticket in tickets_db:
            ticket = tickets_db[num_ticket]
            estado = ticket["estado"]
            comentario = ticket["comentario"]
            
            if estado == "resuelto":
                comentario += " ¿Podemos cerrar el ticket?"
        else:
            estado = "no encontrado"
            comentario = "No existe un ticket con ese número. Verifica el número o reporta un nuevo problema."
        
        return [
            SlotSet("estado", estado),
            SlotSet("comentario", comentario),
            SlotSet("fecha_actualizacion", datetime.now().strftime("%d/%m/%Y %H:%M"))
        ]

class ActionResponderFAQ(Action):
    def name(self) -> Text:
        return "action_responder_faq"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        latest_message = tracker.latest_message.get('text').lower()
        
        if "horario" in latest_message or "hora" in latest_message:
            dispatcher.utter_message(response="utter_faq_horarios")
        elif "contacto" in latest_message or "llamar" in latest_message:
            dispatcher.utter_message(response="utter_faq_contacto")
        else:
            dispatcher.utter_message(response="utter_default")
        
        return []