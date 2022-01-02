import { ViewerLayer as _ViewerLayer } from './components/viewer/viewer-layer';
import { useWidget as _useWidget } from './hooks/useWidget';
import { TCertInfo } from './interfaces/certInfo';
import { IEventSigner } from './interfaces/event-signet';
import { IRectangle } from './interfaces/rectangle';
import "../src/assets/css/index.css";

export const ViewerLayer = _ViewerLayer;

export const useWidgit = _useWidget;

export type {
  TCertInfo,
  IEventSigner,
  IRectangle,
}