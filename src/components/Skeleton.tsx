import { Skeleton } from "antd";
function SkeletonEffect() {
  return (
    <Skeleton.Node
      active={true}
      style={{
        width: "250px",
        height: "250px",
        opacity: 1,
        margin: "8px",
      }}
    />
  );
}

export default SkeletonEffect;
