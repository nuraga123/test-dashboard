const ChevronIcon = ({ state = false }: { state: boolean }) => {
  return (
    <img
      style={{
        transform: state ? "rotate(180deg)" : "rotate(0deg)",
        marginLeft: "8px",
      }}
      src="icon/chevron.svg"
      alt="chevron-icon"
    />
  );
};

export default ChevronIcon;
