const PreviewBox = ({
    width = "20vw",
    borderRadius = "8px",
    borderColor = "#000",
    borderThickness = "1px",
    shadowSize = "2px",
    shadowBlur = "4px",
    shadowColor = "#000",
    hideDate = false
  }) => {
    return (
      <div
        className=" text-black transition-all"
        style={{
          background: "#dedede",
          borderStyle: "solid",
          borderRadius: borderRadius,
          borderColor: borderColor,
          borderWidth: borderThickness + "px",
          padding: "1em",
          margin: "1em 0",
          width: width,
          height: "fit-content",
          boxShadow: `${shadowSize} ${shadowSize} ${shadowBlur} ${shadowColor}`
        }}
      >
        <div className="font-bold mb-[0.2em]">Jane Doe</div>
        <div className="text-[#facc15]">${"★".repeat(4)}${"☆".repeat(1)}</div>
        <div className="mx-[0.2em] my-0">The return policy was hassle-free, which made my shopping experience stress-free. The store had a great selection of products, and the staff was knowledgeable and helpful.</div>
        <div className="text-xs text-gray mt-4">{!hideDate ? `15 June, 2025` : ""}</div>
      </div>
    );
  };
  
  export default PreviewBox;
  