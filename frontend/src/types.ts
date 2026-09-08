export interface SystemReport {
  collected_at: string;
  host: string;
  platform: string;
  uptime: string;
  uptime_seconds: number;
  procs: number;
  hardware: Hardware;
  health_score: number;
  health_score_msg: string;
  cpu: Cpu;
  gpu: Gpu[];
  memory: Memory;
  disks: Disk[];
  trash_size: number;
  trash_approx: boolean;
  disk_io: DiskIo;
  network: NetworkDevice[];
  network_history: NetworkHistory;
  proxy: ProxySettings;
  batteries: Battery[];
  thermal: Thermal;
  sensors: null | any; // Replace 'any' if sensor data structure is known later
  bluetooth: BluetoothDevice[];
  top_processes: Process[];
  process_watch: ProcessWatch;
  process_alerts: any[]; // Replace 'any' if alert data structure is known later
}

export interface Hardware {
  model: string;
  cpu_model: string;
  total_ram: string;
  disk_size: string;
  os_version: string;
  refresh_rate: string;
}

export interface Cpu {
  usage: number;
  per_core: number[];
  per_core_estimated: boolean;
  load1: number;
  load5: number;
  load15: number;
  core_count: number;
  logical_cpu: number;
  p_core_count: number;
  e_core_count: number;
}

export interface Gpu {
  name: string;
  usage: number;
  memory_used: number;
  memory_total: number;
  core_count: number;
  note: string;
}

export interface Memory {
  used: number;
  total: number;
  available: number;
  used_percent: number;
  swap_used: number;
  swap_total: number;
  cached: number;
  pressure: string;
}

export interface Disk {
  mount: string;
  device: string;
  used: number;
  total: number;
  used_percent: number;
  fstype: string;
  external: boolean;
  smart_status: string;
  purgeable: number;
}

export interface DiskIo {
  read_rate: number;
  write_rate: number;
}

export interface NetworkDevice {
  name: string;
  rx_rate_mbs: number;
  tx_rate_mbs: number;
  ip: string;
}

export interface NetworkHistory {
  rx_history: number[];
  tx_history: number[];
}

export interface ProxySettings {
  enabled: boolean;
  type: string;
  host: string;
}

export interface Battery {
  percent: number;
  status: string;
  time_left: string;
  health: string;
  cycle_count: number;
  capacity: number;
}

export interface Thermal {
  cpu_temp: number;
  gpu_temp: number;
  battery_temp: number;
  fan_speed: number;
  fan_count: number;
  system_power: number;
  adapter_power: number;
  battery_power: number;
}

export interface BluetoothDevice {
  name: string;
  connected: boolean;
  battery: string;
}

export interface Process {
  pid: number;
  ppid: number;
  name: string;
  command: string;
  cpu: number;
  memory: number;
  memory_bytes: number;
}

export interface ProcessWatch {
  enabled: boolean;
  cpu_threshold: number;
  window: string;
}



export interface FolderAnalysis {
  path: string;
  overview: boolean;
  entries: FolderEntry[];
  large_files: LargeFile[];
  total_size: number;
  total_files: number;
}

export interface FolderEntry {
  name: string;
  path: string;
  size: number;
  is_dir: boolean;
}

export interface LargeFile {
  name: string;
  path: string;
  size: number;
}
