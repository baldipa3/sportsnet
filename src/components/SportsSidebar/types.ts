export interface NavigationItem {
  type: string;
  label: string;
  icon?: React.ElementType;
  path?: string;
  notifications?: number;
  messages?: number;
}

export interface NavItemProps {
  item: NavigationItem;
  isActive: boolean;
}
