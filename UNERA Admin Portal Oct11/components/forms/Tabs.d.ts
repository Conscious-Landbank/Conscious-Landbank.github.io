export interface TabItem { value: string; label: string; count?: number | string; }
export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}
export function Tabs(props: TabsProps): JSX.Element;
