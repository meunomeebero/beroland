import { Divider as ChakraDivider, Box, useColorModeValue } from "@chakra-ui/react";
import { Draggable } from "../../atoms/draggable";
import { BaseContentProps } from "../../../types/content";

/**
 * Interface for Divider component props
 */
interface DividerProps extends BaseContentProps {
  data: any;
}

/**
 * Divider component that creates a horizontal line separator
 */
export function Divider({
  isDraggable = false,
  data
}: DividerProps) {
  // Extract id with fallback to prevent errors
  const { id = 0 } = data || {};
  
  // Dynamic divider color based on theme
  const dividerColor = useColorModeValue("gray.200", "gray.700");
  const NormalComponent = (
    <ChakraDivider py="2" borderColor={dividerColor} />
  );

  return !isDraggable ? NormalComponent : (
    <Draggable id={id}>
      {NormalComponent}
    </Draggable>
  );
}
