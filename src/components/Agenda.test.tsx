import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Agenda } from "./Agenda";

describe("Componente Agenda", () => {
  beforeEach(() => {
    // Limpiamos el localStorage simulado antes de cada prueba
    // para asegurarnos de que ninguna prueba contamine a la otra
    window.localStorage.clear();
  });

  it("debe renderizar correctamente la vista por defecto (Calendario)", () => {
    // Simulamos la función onClose con vi.fn()
    render(<Agenda onClose={vi.fn()} />);

    // Verifica que el título principal de la agenda exista
    expect(screen.getByText("Agenda Interactiva")).toBeInTheDocument();
    
    // Verifica que el botón de crear visita (propio de la vista calendario) esté presente
    expect(screen.getByText("Nueva Visita")).toBeInTheDocument();
    
    // Verifica que muestre el estado vacío por defecto
    expect(screen.getByText("No hay visitas para este día")).toBeInTheDocument();
  });

  it("debe cambiar a la vista de Clientes al hacer clic en la pestaña correspondiente", () => {
    render(<Agenda onClose={vi.fn()} />);

    // Buscamos el botón de la pestaña "Clientes"
    const btnClientes = screen.getByRole("button", { name: /Clientes/i });
    
    // Simulamos un clic del usuario
    fireEvent.click(btnClientes);

    // Verificamos que la UI haya cambiado
    // El botón "Nuevo Cliente" solo existe en la vista de clientes
    expect(screen.getByText("Nuevo Cliente")).toBeInTheDocument();
    
    // El input de búsqueda también debe aparecer
    expect(screen.getByPlaceholderText("Buscar cliente...")).toBeInTheDocument();
  });
});