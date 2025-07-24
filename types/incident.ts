export interface Incident {
  id: string;
  type: 'Gun Threat' | 'Unauthorized Access' | 'Face Recognised' | 'Traffic Congestion' | 'Multiple Events';
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  camera: {
    name: string;
    location: string;
  };
}
