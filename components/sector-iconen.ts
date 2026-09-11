import type { ComponentType } from "react";
import {
  BadgeCheck,
  Banknote,
  BatteryCharging,
  Bed,
  Boxes,
  BrainCircuit,
  Building2,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Factory,
  FileCheck,
  Gauge,
  HeartPulse,
  Landmark,
  MonitorSmartphone,
  PackageSearch,
  Route,
  ScanBarcode,
  ShieldCheck,
  Sparkles,
  TabletSmartphone,
  Truck,
  UserRound,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";
import type { SectorIcon } from "@/lib/sectoren-detail";

/**
 * De 29 iconen die een sector of use case kan dragen, van sleutel naar component.
 * Gedeeld omdat drie routes hem nodig hebben: de sectordetailpagina, het
 * klantverhalenoverzicht en (via de sectorkaarten) de homepage. Stond eerder
 * volledig in de detailpagina en in een vijfregelige, afwijkende kopie op
 * /klantverhalen — waardoor een icoon dat een redacteur koos daar stilzwijgend
 * kon ontbreken.
 */
export const SECTOR_ICONEN: Record<SectorIcon, ComponentType<{ className?: string }>> = {
  "building-2": Building2,
  truck: Truck,
  banknote: Banknote,
  "heart-pulse": HeartPulse,
  factory: Factory,
  "calendar-check": CalendarCheck,
  route: Route,
  "scan-barcode": ScanBarcode,
  "battery-charging": BatteryCharging,
  "package-search": PackageSearch,
  "clipboard-check": ClipboardCheck,
  "file-check": FileCheck,
  users: Users,
  "shield-check": ShieldCheck,
  workflow: Workflow,
  gauge: Gauge,
  boxes: Boxes,
  "brain-circuit": BrainCircuit,
  "monitor-smartphone": MonitorSmartphone,
  "clipboard-list": ClipboardList,
  sparkles: Sparkles,
  "user-round": UserRound,
  "calendar-days": CalendarDays,
  bed: Bed,
  "calendar-clock": CalendarClock,
  "tablet-smartphone": TabletSmartphone,
  "badge-check": BadgeCheck,
  wrench: Wrench,
  landmark: Landmark,
};
