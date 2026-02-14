import React from "react";

const Breadcrumb = ({ items, textColor }) => {
	return (
		<nav className="flex mb-4 py-4" aria-label="Breadcrumb">
			<ol className="inline-flex pl-0 text-[#282672] items-center space-x-1 md:space-x-3">
				{items.map((item, index) => (
					<li key={index} className="inline-flex items-center">
						{index > 0 && <span className="mx-2 text-gray-400">&gt;</span>}
						<a
							href={`${item.href}.html`}
							className={`text-sm md:text-[18px] font-medium ${
								textColor ? textColor : "text-[#282672]"
							} hover:text-blue-500`}
						>
							{item.label}
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
