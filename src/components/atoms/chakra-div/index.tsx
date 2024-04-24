import {  chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

export const ChakraDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});
