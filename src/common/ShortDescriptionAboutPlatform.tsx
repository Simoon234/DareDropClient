import { ShortDescriptionAboutPlatformI } from "../types/types";

const ShortDescriptionAboutPlatform = ({
  shortDescription,
}: ShortDescriptionAboutPlatformI) => {
  return (
    <p aria-label="description" className="text-[15px] text-justify mt-2">
      {shortDescription}
    </p>
  );
};

export default ShortDescriptionAboutPlatform;
