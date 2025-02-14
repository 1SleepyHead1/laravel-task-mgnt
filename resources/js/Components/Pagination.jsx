import { Link } from "@inertiajs/react";

export default function Pagination({ links, queryParams = {} }) {
  const buildHref = (link) => {
    if (!link.url) {
      return null;
    }

    const params = new URLSearchParams();
    if (queryParams.name) {
      params.append("name", queryParams.name);
    }

    if (queryParams.status) {
      params.append("status", queryParams.status);
    }

    if (queryParams.sort_direction) {
      params.append("sort_direction", queryParams.sort_direction);
    }

    if (queryParams.sort_field) {
      params.append("sort_field", queryParams.sort_field);
    }

    const paramString = params.toString();
    return paramString ? `${link.url}&${paramString}` : link.url;
  };

  return (
    <nav className="text-center">
      {links.map((link, index) => (
        <Link
          key={index}
          className={`inline-block py-1 px-3 mt-4 mx-1 rounded-lg text-white ${
            link.active ? "bg-gray-950" : ""
          } ${
            !link.url ? "text-gray-500 cursor-not-allowed" : "hover:bg-gray-950"
          }`}
          href={buildHref(link)}
          preserveScroll
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}
