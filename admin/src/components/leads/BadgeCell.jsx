import { Badge } from "../ui/badge";

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "N/A";

export default function BadgeCell({ value, colors }) {
  return (
    <Badge className={colors[value] || ""}>
      {capitalize(value)}
    </Badge>
  );
}