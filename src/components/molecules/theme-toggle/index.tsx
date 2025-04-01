import { IconButton, Box } from "@chakra-ui/react";
import { useTheme } from "../../../hooks/useTheme";
import { useCallback } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

// Defining interface for the toggle button
interface ThemeToggleProps {
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

/**
 * Button component to toggle between light and dark themes
 */
export function ThemeToggle({ position = { top: "4", left: "4" } }: ThemeToggleProps) {
  const theme = useTheme();

  // Selecting the correct icon based on the current theme
  const icon = theme.isLight ? <FaMoon /> : <FaSun />;

  // Styles based on the current theme
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
      aria-label="Toggle theme"
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