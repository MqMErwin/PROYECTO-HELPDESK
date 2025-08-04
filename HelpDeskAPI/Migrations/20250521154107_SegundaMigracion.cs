using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HelpDeskAPI.Migrations
{
    /// <inheritdoc />
    public partial class SegundaMigracion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Categoria",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "FechaResolucion",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Remitente",
                table: "ChatMessages");

            migrationBuilder.RenameColumn(
                name: "Prioridad",
                table: "Tickets",
                newName: "Titulo");

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "ChatMessages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_UsuarioId",
                table: "ChatMessages",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_Users_UsuarioId",
                table: "ChatMessages",
                column: "UsuarioId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_Users_UsuarioId",
                table: "ChatMessages");

            migrationBuilder.DropIndex(
                name: "IX_ChatMessages_UsuarioId",
                table: "ChatMessages");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "ChatMessages");

            migrationBuilder.RenameColumn(
                name: "Titulo",
                table: "Tickets",
                newName: "Prioridad");

            migrationBuilder.AddColumn<string>(
                name: "Categoria",
                table: "Tickets",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaResolucion",
                table: "Tickets",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Remitente",
                table: "ChatMessages",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
