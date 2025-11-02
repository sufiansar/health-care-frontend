const svgPaths = {
  p18804580:
    "M8 1.75c.24 0 .47.13.6.34l1.06 1.8 1.8 1.06c.21.12.34.36.34.6 0 .24-.13.48-.34.6l-1.8 1.06-1.06 1.8a.675.675 0 01-1.2 0L6.06 8.25 4.26 7.19A.69.69 0 014 6.59c0-.24.13-.48.34-.6l1.8-1.06L7.2 3.03c.13-.21.36-.34.6-.34z",

  p2511de00:
    "M16 3.5c.48 0 .93.26 1.19.68l2.13 3.62 3.62 2.13c.42.26.68.71.68 1.19 0 .48-.26.93-.68 1.19l-3.62 2.13-2.13 3.62a1.25 1.25 0 01-2.22 0L12.25 17.5 9.13 15.37A1.25 1.25 0 018 14.19c0-.48.26-.93.68-1.19l3.62-2.13L12.81 6.37c-.26-.42-.42-.87-.42-1.37 0-.5.16-.95.42-1.37.26-.42.71-.68 1.19-.68z",
};

export function SparkleIcon() {
  return (
    <div className="size-[15.994px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
      >
        <g clipPath="url(#clip0_1_26)">
          <path
            d={svgPaths.p18804580}
            stroke="#1D4ED8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M13.3286 1.99929V4.66501"
            stroke="#1D4ED8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M14.6615 3.33215H11.9957"
            stroke="#1D4ED8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M2.66572 11.3293V12.6622"
            stroke="#1D4ED8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M3.33215 11.9957H1.99929"
            stroke="#1D4ED8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_26">
            <rect fill="white" height="15.9943" width="15.9943" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function LargeSparkleIcon() {
  return (
    <div className="size-[31.989px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g>
          <path
            d={svgPaths.p2511de00}
            stroke="#2563EB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M26.6572 3.99858V9.33002"
            stroke="#2563EB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M29.3229 6.6643H23.9915"
            stroke="#2563EB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M5.33144 22.6586V25.3243"
            stroke="#2563EB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            d="M6.6643 23.9915H3.99858"
            stroke="#2563EB"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
}
