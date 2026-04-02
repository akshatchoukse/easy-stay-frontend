import React from 'react';
import { Diamond } from 'lucide-react';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';

const iconLibraries: Record<string, any> = {
  ai: AiIcons,
  bs: BsIcons,
  bi: BiIcons,
  fa: FaIcons,
  md: MdIcons,
  hi: HiIcons,
  ri: RiIcons,
  si: SiIcons,
};

interface DynamicIconProps {
  iconName?: string;
  className?: string;
  fallback?: React.ReactNode;
}

const DynamicIcon = ({ iconName, className, fallback }: DynamicIconProps) => {
  if (!iconName) return fallback ? <>{fallback}</> : <Diamond className={className} />;
  
  const prefix = iconName.substring(0, 2).toLowerCase();
  const lib = iconLibraries[prefix];
  
  if (lib && lib[iconName]) {
    const IconComponent = lib[iconName];
    return <IconComponent className={className} />;
  }
  
  return fallback ? <>{fallback}</> : <Diamond className={className} />;
};

export default DynamicIcon;
