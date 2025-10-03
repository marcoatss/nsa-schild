import DocumentIcon from "@heroicons/react/24/outline/DocumentIcon";

import { Link } from "@/components/navigation";
import { File } from "@/lib/types";

export interface ProductFilesProps {
  files: (File | null)[];
}

export const ProductFilesComponent: React.FC<ProductFilesProps> = ({
  files,
}) => {
  return (
    <>
      <div className="border-b border-b-border bg-foreground px-8 py-4">
        <h1 className="text-center text-sm font-bold uppercase text-white">
          Files
        </h1>
      </div>
      <div
        className={`
          mb-[-1px] flex flex-col gap-4 border-b border-b-border
          bg-foreground/20 px-4 py-5

          lg:gap-8 lg:px-8 lg:py-10
        `}
      >
        {files.map((file) => (
          <>
            {file ? (
              <Link
                key={file.id}
                className={`
                  flex items-center gap-4 border border-border bg-background p-4
                `}
                href={file.src}
                target="_blank"
              >
                <DocumentIcon className="h-6 w-6" />
                <span className="text-sm font-medium">{file.name}</span>
              </Link>
            ) : (
              <div
                className={`
                  flex items-center gap-4 border border-border bg-background p-4
                `}
              >
                <DocumentIcon className="h-6 w-6" />
                <span className="text-sm font-medium">File not found</span>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};
