/**
 * Interface de props para o componente Markdown
 */
export interface MarkdownProps {
  /** Flag que indica se o componente pode ser arrastado */
  isDraggable?: boolean;
  
  /** Flag que indica se o componente está no modo de edição */
  isEditing?: boolean;
  
  /** Dados do componente */
  data: {
    /** ID do elemento na UI */
    id: number;
    
    /** ID do elemento no banco de dados */
    dbId: number;
    
    /** Conteúdo markdown */
    content: string;
    
    /** Ordem do elemento na lista */
    order: number;
  };
}