import { Button } from "./ui/button";
import { cn } from "../utils/cn";
import { CheckCircle } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ValidationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  withPulse?: boolean;
  withIndicator?: boolean;
  variant?: "green" | "blue" | "purple" | "orange" | "red";
  icon?: React.ComponentType<{ className?: string }>;
}

const gradientVariants = {
  green: {
    base: "from-green-600 to-green-700",
    hover: "hover:from-green-700 hover:to-green-800",
    shadow: "hover:shadow-green-400/50",
  },
  blue: {
    base: "from-blue-600 to-blue-700",
    hover: "hover:from-blue-700 hover:to-blue-800",
    shadow: "hover:shadow-blue-400/50",
  },
  purple: {
    base: "from-purple-600 to-purple-700",
    hover: "hover:from-purple-700 hover:to-purple-800",
    shadow: "hover:shadow-purple-400/50",
  },
  orange: {
    base: "from-orange-600 to-orange-700",
    hover: "hover:from-orange-700 hover:to-orange-800",
    shadow: "hover:shadow-orange-400/50",
  },
  red: {
    base: "from-red-600 to-red-700",
    hover: "hover:from-red-700 hover:to-red-800",
    shadow: "hover:shadow-red-400/50",
  },
};

export const ValidationButton = forwardRef<
  HTMLButtonElement,
  ValidationButtonProps
>(
  (
    {
      children,
      className,
      withPulse = false,
      withIndicator = true,
      variant = "green",
      icon: Icon = CheckCircle,
      ...props
    },
    ref
  ) => {
    const gradients = gradientVariants[variant];

    return (
      <Button
        ref={ref}
        size="lg"
        className={cn(
          "px-8 py-4 font-bold text-white border-0 shadow-xl transition-all duration-300 relative",
          `bg-gradient-to-r ${gradients.base}`,
          `${gradients.hover} hover:scale-105 hover:shadow-2xl ${gradients.shadow}`,
          withPulse && "animate-pulse",
          "focus:animate-none hover:animate-none",
          className
        )}
        {...props}
      >
        <div className="flex justify-center items-center mr-3 w-6 h-6 rounded-full bg-white/20">
          <Icon className="w-4 h-4" />
        </div>
        {children}
        {withIndicator && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
        )}
      </Button>
    );
  }
);

ValidationButton.displayName = "ValidationButton";
