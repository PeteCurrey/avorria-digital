import { version } from "react";
import * as ReactDOM from "react-dom";

const ReactVersionBanner = () => {
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed top-0 left-0 z-[9999] bg-yellow-400 text-black text-xs px-2 py-1 font-mono">
      React {version} | ReactDOM {ReactDOM.version}
    </div>
  );
};

export default ReactVersionBanner;
