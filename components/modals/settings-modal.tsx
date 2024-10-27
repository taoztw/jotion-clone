"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { useSettings } from "@/hooks/use-settings";
import { Label } from "@/components/ui/label";
import { useSearch } from "@/hooks/use-search";
import { ModeToggle } from "../ModeToggle";

function SettingModal() {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div
          className="flex items-center justify-between
         "
        >
          <div className="flex flex-col">
            <Label>Apperance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Jotion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SettingModal;
