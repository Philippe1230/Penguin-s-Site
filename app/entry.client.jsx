import { RemixBrowser } from "@remix-run/react";
import { createRoot } from "react-dom/client";

const root = document.getElementById("root") || document;

createRoot(root).render(<RemixBrowser />);
