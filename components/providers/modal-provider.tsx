import { useState, useEffect } from "react";
import SettingModal from "../modals/settings-modal";
import { CoverImageModal } from "../modals/cover-image-modal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingModal />
      <CoverImageModal />
    </>
  );
}

export default ModalProvider;
