// Public entry point for @jacopozanti/ui.
//
// Consumers must also import the design tokens once in their Tailwind CSS:
//   @import "@jacopozanti/ui/theme.css";
// Apps without Tailwind import the precompiled stylesheet instead:
//   import "@jacopozanti/ui/styles.css";
//
// One `export *` per component: the 49 modules share no symbol names, so the
// barrel stays flat and a component added later needs no edit here beyond its
// own line. Keep it sorted.

export * from "@/components/ui/accordion";
export * from "@/components/ui/alert";
export * from "@/components/ui/alert-dialog";
export * from "@/components/ui/aspect-ratio";
export * from "@/components/ui/avatar";
export * from "@/components/ui/badge";
export * from "@/components/ui/breadcrumb";
export * from "@/components/ui/button";
export * from "@/components/ui/button-group";
export * from "@/components/ui/card";
export * from "@/components/ui/checkbox";
export * from "@/components/ui/collapsible";
export * from "@/components/ui/combobox";
export * from "@/components/ui/context-menu";
export * from "@/components/ui/dialog";
export * from "@/components/ui/direction";
export * from "@/components/ui/drawer";
export * from "@/components/ui/dropdown-menu";
export * from "@/components/ui/empty";
export * from "@/components/ui/field";
export * from "@/components/ui/hover-card";
export * from "@/components/ui/input";
export * from "@/components/ui/input-group";
export * from "@/components/ui/item";
export * from "@/components/ui/kbd";
export * from "@/components/ui/label";
export * from "@/components/ui/menubar";
export * from "@/components/ui/native-select";
export * from "@/components/ui/navigation-menu";
export * from "@/components/ui/pagination";
export * from "@/components/ui/popover";
export * from "@/components/ui/progress";
export * from "@/components/ui/radio-group";
export * from "@/components/ui/scroll-area";
export * from "@/components/ui/select";
export * from "@/components/ui/separator";
export * from "@/components/ui/sheet";
export * from "@/components/ui/sidebar";
export * from "@/components/ui/skeleton";
export * from "@/components/ui/slider";
export * from "@/components/ui/spinner";
export * from "@/components/ui/switch";
export * from "@/components/ui/table";
export * from "@/components/ui/tabs";
export * from "@/components/ui/textarea";
export * from "@/components/ui/toast";
export * from "@/components/ui/toggle";
export * from "@/components/ui/toggle-group";
export * from "@/components/ui/tooltip";

// ----- Hooks -----
export * from "@/hooks/use-mobile";

// Re-exported so consumers can compose class names against our variants without
// taking their own dependency on it.
export { cn } from "cn";
