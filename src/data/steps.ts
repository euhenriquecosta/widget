import type { ChatStep, FormData } from '../utils/types';

export const chatSteps: ChatStep[] = [
  {
    id: 1,
    question: "Olá! Qual é o seu nome?",
    field: "name",
    type: "text",
    required: true,
    validation: {
      required: "Por favor, informe seu nome",
      minLength: {
        value: 2,
        message: "O nome deve ter pelo menos 2 caracteres"
      }
    }
  },
  {
    id: 2,
    question: "Qual é o seu e-mail?",
    field: "email",
    type: "email",
    required: true,
    validation: {
      required: "Por favor, informe seu e-mail",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Por favor, informe um e-mail válido"
      }
    }
  },
  {
    id: 3,
    question: "Em qual empresa você trabalha? (opcional)",
    field: "company",
    type: "text",
    required: false
  },
  {
    id: 4,
    question: "Qual categoria melhor descreve sua necessidade?",
    field: "category",
    type: "select",
    options: [
      "Suporte Técnico",
      "Vendas",
      "Parcerias",
      "Outros"
    ],
    required: true,
    validation: {
      required: "Por favor, selecione uma categoria"
    }
  },
  {
    id: 5,
    question: "Conte-nos mais sobre sua necessidade:",
    field: "message",
    type: "textarea",
    required: true,
    validation: {
      required: "Por favor, descreva sua necessidade",
      minLength: {
        value: 10,
        message: "A mensagem deve ter pelo menos 10 caracteres"
      }
    }
  }
];

export const defaultFormData: FormData = {
  name: '',
  email: '',
  company: '',
  message: '',
  category: '',
}; 