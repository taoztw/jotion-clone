import { Button } from "@/components/ui/button";

import Logo from "./Logo";

function Footer() {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="hidden md:block">
        <Logo />
      </div>

      <div className="flex w-full justify-between md:justify-end text-muted-foreground">
        <Button variant="ghost">Privacy Policy</Button>
        <Button variant="ghost">Terms & Cibdutions</Button>
      </div>
    </div>
  );
}

export default Footer;
