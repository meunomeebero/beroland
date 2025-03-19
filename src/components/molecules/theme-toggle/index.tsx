import { IconButton, Box } from "@chakra-ui/react";
import { useTheme } from "../../../hooks/useTheme";
import { FC, useCallback } from "react";

// Definindo interface para os ícones
interface IconProps {
  color?: string;
}

// Custom Moon Icon component
const MoonIcon: FC<IconProps> = ({ color = "currentColor" }) => (
  <Box w="18px" h="18px" display="flex" justifyContent="center" alignItems="center">
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </Box>
);

// Custom Sun Icon component
const SunIcon: FC<IconProps> = ({ color = "currentColor" }) => (
  <Box w="18px" h="18px" display="flex" justifyContent="center" alignItems="center">
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  </Box>
);

// Definindo interface para o botão de toggle
interface ThemeToggleProps {
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

/**
 * Componente de botão para alternar entre os temas claro e escuro
 */
export function ThemeToggle({ position = { top: "4", left: "4" } }: ThemeToggleProps) {
  const theme = useTheme();
  
  // Selecionando o ícone correto com base no tema atual
  const icon = theme.isLight ? <MoonIcon /> : <SunIcon />;
  
  // Estilos baseados no tema atual
  const bg = theme.isLight ? "white" : "gray.800";
  const iconColor = theme.isLight ? theme.accent.secondary : theme.accent.yellow;
  
  // Function to toggle theme and synchronize data-theme attribute
  const handleToggleTheme = useCallback(() => {
    // Toggle the color mode
    theme.toggleColorMode();
    
    // Wait for the next DOM update to get the updated value
    setTimeout(() => {
      // Get the new color mode from localStorage
      const colorMode = localStorage.getItem("chakra-ui-color-mode") || "light";
      
      // Update data-theme attribute
      document.documentElement.setAttribute("data-theme", colorMode);
      
      // Dispatch custom event for theme change
      window.dispatchEvent(new CustomEvent("themechange", { 
        detail: { colorMode } 
      }));
      
      // Also dispatch storage event for compatibility
      window.dispatchEvent(new Event("storage"));
    }, 0);
  }, [theme]);

  return (
    <IconButton
      position="fixed"
      {...position}
      aria-label="Alternar tema"
      icon={icon}
      onClick={handleToggleTheme}
      bg={bg}
      color={iconColor}
      size="md"
      borderRadius="full"
      boxShadow="md"
      zIndex={10}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "lg",
      }}
    />
  );
}