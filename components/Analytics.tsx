import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Loads GA4 only when NEXT_PUBLIC_GA_MEASUREMENT_ID is configured (a public
 * ID, not a secret). Without it no third-party script is requested at all;
 * `track()` still pushes to window.dataLayer, which stays local.
 */
export function Analytics() {
  const id = SITE.gaMeasurementId;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
