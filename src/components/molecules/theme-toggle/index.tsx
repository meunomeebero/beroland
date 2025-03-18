import { IconButton, useColorMode, useColorModeValue, Box } from "@chakra-ui/react";

// Custom Moon Icon component
const MoonIcon = () => (
  <Box w="18px" h="18px" display="flex" justifyContent="center" alignItems="center">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </Box>
);

// Custom Sun Icon component
const SunIcon = () => (
  <Box w="18px" h="18px" display="flex" justifyContent="center" alignItems="center">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export function ThemeToggle() {
  const { toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const bg = useColorModeValue("white", "gray.800");

  return (
    <IconButton
      position="fixed"
      top="4"
      left="4"
      aria-label="Toggle theme"
      icon={icon}
      onClick={toggleColorMode}
      bg={bg}
      size="md"
      borderRadius="full"
      boxShadow="md"
      zIndex={10}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.05)",
      }}
    />
  );
}