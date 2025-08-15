import * as React from "react";
import { cn } from "../../lib/utils";

function Badge({ className, variant = "default", ...props }) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-cyan-700 text-white", // default styling
				className
			)}
			{...props}
		/>
	);
}

export { Badge };
