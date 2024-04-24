const containerUpVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const containerRightToLeftVariant = {
  hidden: { x: 40, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

export const containerUp = {
  initial: "hidden",
  animate: "visible",
  variants: { ...containerUpVariant }
}

export const containerRightToLeft = {
  initial: "hidden",
  animate: "visible",
  variants: { ...containerRightToLeftVariant }
}