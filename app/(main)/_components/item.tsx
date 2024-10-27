import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  Icon: LucideIcon;
}

function Item({
  label,
  onClick,
  Icon,
  expanded,
  active,
  id,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) {
  const { user } = useUser();
  // 展开事件
  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event?.stopPropagation();
    onExpand?.();
  };
  // 展开图标
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const router = useRouter();

  // 创建文档
  const create = useMutation(api.documents.create);
  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      success: "Creating a new note...",
      loading: "Creating...",
      error: "Failed to create a new note",
    });
  };

  // 删除文档
  const archive = useMutation(api.documents.archive);
  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = archive({ id }).then(() => router.push("/documents"));
    toast.promise(promise, {
      success: "Document archived",
      loading: "Archiving document...",
      error: "Failed to archive document",
    });
  };

  return (
    <div className="px-2">
      <div
        role="button"
        className={cn(
          "group min-h-[30px] flex  px-1 py-2 text-sm w-full hover:bg-primary/5 items-center",
          active && "bg-primary/5 text-primary"
        )}
        onClick={onClick}
        style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      >
        {/* 展开按钮 */}
        {!!id && (
          <div
            role="button"
            className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
            onClick={handleExpand}
          >
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
          </div>
        )}

        {/* 文档icon */}
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
        ) : (
          <Icon className="text-muted-foreground w-[18px] h-[18px] mr-2 shrink-0" />
        )}

        <span className="truncate text-muted-foreground">{label}</span>

        {/* 搜索业务 */}
        {isSearch && (
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>k
          </kbd>
        )}

        {!!id && (
          <div className="ml-auto flex items-center gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                <div
                  role="button"
                  className="hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60"
                align="start"
                side="right"
                forceMount
              >
                <DropdownMenuItem onClick={onArchive}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="text-muted-foreground text-xs">
                    Last edited by: {user?.fullName}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              role="button"
              className="opacity-0 group-hover:opacity-100 ml-auto h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              onClick={onCreate}
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Item.Skeleton = function ItemSkeletion({ level }: { level?: number }) {
  return (
    <div
      className="flex gap-x-2 py-[3px]"
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
