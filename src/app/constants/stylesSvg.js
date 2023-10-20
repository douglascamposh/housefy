export const stylesSvg = `
.default-path-style {
  fill: #313231;
  stroke: white;
  transition: fill 0.3s ease, stroke 0.3s ease;
}

.default-path-style:hover {
  cursor: pointer;
  fill: #535550;
}
.selected-path {
  fill: #2d0df1;
}
.selected-path:hover {
  fill: #5E46EE;
}
.not-available-path {
  fill: #e90107;
}
.not-available-path:hover {
  fill: #EE474B;
}
.common-area-path {
  fill: #66FFFF;
}
.common-area-path:hover {
  fill: #47EEEE;
}
.reserved-path {
  fill: #ECC604;
}
.reserved-path:hover {
  fill: #EBD047;
}
.available-path {
  fill: #2db303;
}
.available-path:hover {
  fill: #6FEE47;
}
`;
