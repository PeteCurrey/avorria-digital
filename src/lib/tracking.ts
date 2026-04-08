'use client';
/**
 * Analytics Tracking Utility
 * 
 * Centralized event tracking for GA4/GTM integration.
 * All events use snake_case naming and consistent parameter structure.
 */

// Declare dataLayer for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

// ============= Event Name Constants =============
export const EVENTS = {
  // Navigation
  NAV_CLICK: 'nav_click',
  
  // CTAs
  CTA_CLICK: 'cta_click',
  
  // Audit Funnel
  AUDIT_FUNNEL_VIEWED: 'audit_funnel_viewed',
  AUDIT_FORM_STARTED: 'audit_form_started',
  AUDIT_FORM_SUBMITTED: 'audit_form_submitted',
  AUDIT_REPORT_GENERATED: 'audit_report_generated',
  AUDIT_REPORT_VIEWED: 'audit_report_viewed',
  AUDIT_REPORT_DOWNLOADED: 'audit_report_downloaded',
  AUDIT_CTA_CLICKED: 'audit_cta_clicked',
  AUDIT_FORM_ERROR: 'audit_form_error',
  
  // Project Estimator
  ESTIMATOR_VIEWED: 'estimator_viewed',
  ESTIMATOR_STEP_COMPLETED: 'estimator_step_completed',
  ESTIMATOR_SUBMITTED: 'estimator_submitted',
  ESTIMATOR_ABANDONED: 'estimator_abandoned',
  
  // Website Health Check
  HEALTH_CHECK_STARTED: 'health_check_started',
  HEALTH_CHECK_COMPLETED: 'health_check_completed',
  HEALTH_CHECK_EMAIL_OPTIN: 'health_check_email_optin',
  
  // Case Studies
  CASE_STUDY_LIST_VIEWED: 'case_study_list_viewed',
  CASE_STUDY_OPENED: 'case_study_opened',
  CASE_STUDY_CTA_CLICK: 'case_study_cta_click',
  
  // Resources
  RESOURCE_LIST_VIEWED: 'resource_list_viewed',
  RESOURCE_OPENED: 'resource_opened',
  RESOURCE_PDF_DOWNLOADED: 'resource_pdf_downloaded',
  RESOURCE_SHARED: 'resource_shared',
  
  // Pricing & Contact
  PRICING_VIEWED: 'pricing_viewed',
  PRICING_CTA_CLICK: 'pricing_cta_click',
  PRICING_ESTIMATOR_LAUNCH: 'pricing_estimator_launch',
  CONTACT_FORM_STARTED: 'contact_form_started',
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
  CONTACT_FORM_ERROR: 'contact_form_error',
  
  // Client Portal
  CLIENT_PORTAL_LOGIN: 'client_portal_login',
  CLIENT_TAB_VIEWED: 'client_tab_viewed',
  CLIENT_AUDIT_LIST_VIEWED: 'client_audit_list_viewed',
  CLIENT_AUDIT_OPENED: 'client_audit_opened',
  CLIENT_AUDIT_CTA_CLICKED: 'client_audit_cta_clicked',
  CLIENT_HEALTH_VIEWED: 'client_health_viewed',
  CLIENT_HEALTH_TIME_RANGE_CHANGED: 'client_health_time_range_changed',
  CLIENT_REPORTING_VIEWED: 'client_reporting_viewed',
  CLIENT_REPORTING_CHANNEL_TAB: 'client_reporting_channel_tab',
  
  // Platform (Internal)
  PLATFORM_LOGIN: 'platform_login',
  PLATFORM_SECTION_VIEWED: 'platform_section_viewed',
  PLATFORM_CLIENT_OPENED: 'platform_client_opened',
  PLATFORM_CAMPAIGN_OPENED: 'platform_campaign_opened',
  PLAYBOOK_OPENED: 'playbook_opened',
  PLAYBOOK_MARKED_APPLIED: 'playbook_marked_applied',
  
  // Errors & UX
  API_ERROR: 'api_error',
  UI_ERROR: 'ui_error',
} as const;

// ============= Core Tracking Function =============
interface TrackingParams {
  [key: string]: any;
}

export function trackEvent(eventName: string, params: TrackingParams = {}) {
  // Use a safer dev check for Next.js
  const isDev = process.env.NODE_ENV === 'development';
  
  // Add common context safely for SSR
  const enrichedParams: TrackingParams = {
    ...params,
    timestamp: new Date().toISOString(),
  };
  
  if (typeof window !== 'undefined') {
    enrichedParams.page_path = window.location.pathname;
    enrichedParams.page_title = document.title;
    
    // Log to console in dev mode
    if (isDev) {
      console.log('[Analytics Event]', eventName, enrichedParams);
    }
    
    // Push to dataLayer if it exists
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...enrichedParams,
      });
    }
  }
}

// ============= Helper Functions =============

/**
 * Get user type based on current route
 */
export function getUserType(): 'anonymous' | 'client' | 'internal' {
  if (typeof window === 'undefined') return 'anonymous';
  const path = window.location.pathname;
  
  if (path.startsWith('/client')) return 'client';
  if (path.startsWith('/platform')) return 'internal';
  return 'anonymous';
}

/**
 * Track navigation clicks
 */
export function trackNavClick(navItem: string, location: 'header' | 'footer' | 'in_page' = 'header') {
  trackEvent(EVENTS.NAV_CLICK, {
    nav_item: navItem,
    location,
    user_type: getUserType(),
  });
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(
  ctaLabel: string,
  ctaDestination: string,
  pageSection?: string
) {
  trackEvent(EVENTS.CTA_CLICK, {
    cta_label: ctaLabel,
    cta_destination: ctaDestination,
    page_section: pageSection,
    user_type: getUserType(),
  });
}

/**
 * Track form starts (first field interaction)
 */
export function trackFormStart(formType: string, sourcePage: string, formVariant?: string) {
  trackEvent(
    formType === 'audit' ? EVENTS.AUDIT_FORM_STARTED :
    formType === 'contact' ? EVENTS.CONTACT_FORM_STARTED :
    'form_started',
    {
      source_page: sourcePage,
      form_variant: formVariant,
      user_type: getUserType(),
    }
  );
}

/**
 * Track API errors
 */
export function trackAPIError(endpoint: string, statusCode: number, context?: string) {
  trackEvent(EVENTS.API_ERROR, {
    endpoint,
    status_code: statusCode,
    context: context || getUserType(),
  });
}

/**
 * Track UI errors
 */
export function trackUIError(component: string, errorMessage: string) {
  trackEvent(EVENTS.UI_ERROR, {
    component,
    error_message: errorMessage.substring(0, 200), // Truncate to 200 chars
  });
}

/**
 * Track page view (call on route changes)
 */
export function trackPageView(pageTitle?: string) {
  trackEvent('page_view', {
    page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
    user_type: getUserType(),
  });
}

// ============= Audit Funnel Tracking =============

/**
 * Track audit funnel page view
 */
export function trackAuditFunnelView(source?: string) {
  trackEvent(EVENTS.AUDIT_FUNNEL_VIEWED, {
    source: source || 'direct',
    referrer: typeof document !== 'undefined' ? document.referrer : 'none',
  });
}

/**
 * Track audit report generation success
 */
export function trackAuditReportGenerated(score: number, websiteUrl: string) {
  try {
    trackEvent(EVENTS.AUDIT_REPORT_GENERATED, {
      overall_score: score,
      website_domain: new URL(websiteUrl).hostname,
    });
  } catch (e) {
    console.error("Tracking error:", e);
  }
}

/**
 * Track audit report view/download
 */
export function trackAuditReportView(reportUrl: string, action: 'view' | 'download' = 'view') {
  trackEvent(action === 'view' ? EVENTS.AUDIT_REPORT_VIEWED : EVENTS.AUDIT_REPORT_DOWNLOADED, {
    report_url: reportUrl,
  });
}

/**
 * Track audit CTA click (e.g., "Book a Strategy Call" after audit)
 */
export function trackAuditCTAClick(ctaLabel: string, destination: string) {
  trackEvent(EVENTS.AUDIT_CTA_CLICKED, {
    cta_label: ctaLabel,
    cta_destination: destination,
  });
}

