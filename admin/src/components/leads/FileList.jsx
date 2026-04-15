import { FileText } from "lucide-react";
import { Button } from "../ui/button";

export default function FileList({ files }) {
  if (!files || files.length === 0) {
    return <span className="text-muted-foreground">No file</span>;
  }

  return (
    <div className="flex flex-col gap-1">
      {files.map((url, i) => (
        <Button key={i} size="sm" variant="ghost" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <FileText className="size-4 mr-1" />
            File {i + 1}
          </a>
        </Button>
      ))}
    </div>
  );
}