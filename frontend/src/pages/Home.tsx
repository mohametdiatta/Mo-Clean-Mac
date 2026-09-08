import React, { PropsWithChildren, useEffect, useState } from "react";
import { Activity, Laptop, Play, Clock3, Info, HardDrive } from "lucide-react";
import { RunCommand } from "../../wailsjs/go/main/App";
import { SystemReport } from "../types";
import { bytesToGB } from "../utils";
import { formatDistanceToNow } from "date-fns";

const storage = [
  {
    label: "Applications",
    value: "0 GB",
    percent: "36%",
    tone: "blue",
    path: "~/Applications",
  },
  {
    label: "Documents",
    value: "0 GB",
    percent: "19%",
    tone: "green",
    path: "~/Documents",
  },
  {
    label: "Photos",
    value: "0 GB",
    percent: "13%",
    tone: "amber",
    path: "~/Pictures",
  },
  {
    label: "System",
    value: "0 GB",
    percent: "8%",
    tone: "purple",
    path: "~",
  },
  {
    label: "Other",
    value: "0 GB",
    percent: "5%",
    tone: "gray",
    path: "",
  },
];

interface StorageOutput {
  label: string;
  value: string;
  percent: string;
  tone: string;
  path: string;
}

function IconCircle({
  children,
  className = "",
}: PropsWithChildren & { className?: string }) {
  return <div className={`icon-circle ${className}`}>{children}</div>;
}

function Home() {
  const [scanning, setScanning] = useState(false);
  const [storageOutput, setStorageOutput] = useState<StorageOutput[]>([]);

  const startScan = async () => {
    try {
      setScanning(true);
      await RunCommand("mo clean");
    } catch (error) {
      setScanning(false);
    } finally {
      setScanning(false);
    }
  };

  const [output, setOutput] = React.useState<SystemReport | null>(null);
  const runCommandStatus = async (command: string) => {
    const result = await RunCommand(command);
    try {
      const parsed = JSON.parse(result);
      setOutput(parsed);
    } catch (error) {
      setOutput(null);
    }
  };

  useEffect(() => {
    runCommandStatus("mo status --json");
  }, []);

  const runCommandStorage = async () => {
    try {
      const res = [];
      for (let store of storage) {
        try {
          const result = await RunCommand(`mo analyze --json ${store.path}`);
          const parsed = JSON.parse(result);
          res.push({
            ...store,
            value: `${bytesToGB(parsed?.total_size || 0)} GB`,
          });
        } catch (error) {
          console.log(error);
          res.push(null);
        }
      }
      setStorageOutput(res as StorageOutput[]);
    } catch (error) {
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    runCommandStorage();
  }, []);


  return (
    <>
      <header className="topbar">
        <div>
          <div className="eyebrow">SMART SCAN</div>
          <h1>Your Mac is ready</h1>
          <p className="subtitle">
            Scan your Mac <span>→</span> Find unnecessary files <span>→</span>{" "}
            Clean it safely.
          </p>
        </div>

        <div className="os-badge">
          <Laptop size={15} />
          <span>{`${output?.hardware?.model || "-"} (${output?.hardware?.os_version || "-"})`}</span>
        </div>
      </header>

      <section className="hero-grid">
        <div className="scan-column">
          <div className={`scan-ring ${scanning ? "scanning" : ""}`}>
            <div className="ring-track" />
            <div className="ring-progress" />
            <div className="ring-inner">
              <Laptop size={39} strokeWidth={1.5} />
              <strong>{scanning ? "Scanning…" : "Ready to scan"}</strong>
              <span>
                {scanning
                  ? "Analyzing your system and looking for unnecessary files."
                  : "We'll analyze your system and find what can be cleaned."}
              </span>
            </div>
          </div>

          <button
            className="scan-button"
            onClick={startScan}
            disabled={scanning}
          >
            {scanning ? (
              <span className="spinner" />
            ) : (
              <Play size={16} fill="currentColor" />
            )}
            {scanning ? "Scanning Mac" : "Smart Scan"}
          </button>
        </div>

        <div className="dashboard-column">
          <div className="recover-card card">
            <IconCircle>
              <HardDrive size={25} strokeWidth={1.6} />
            </IconCircle>
            <div>
              <small>Estimated recoverable storage</small>
              <div className="recover-value">
                {output?.disks[0]?.purgeable
                  ? `${bytesToGB(output.disks[0].purgeable)} GB`
                  : "--"}{" "}
                <Info size={16} />
              </div>
            </div>
          </div>
          <div className="storage-card card">
            <div className="card-heading">
              <h2>Storage overview</h2>
              <span>{`${bytesToGB(output?.disks?.[0]?.used || 0)} GB used / ${bytesToGB(output?.disks?.[0]?.total || 0)} GB`}</span>
            </div>

            <div
              className="storage-bar"
              aria-label={`${bytesToGB(output?.disks?.[0]?.used || 0)} GB used of ${bytesToGB(output?.disks?.[0]?.total || 0)} GB`}
            >
              <span
                className="used-bar"
                style={{ width: `${output?.disks?.[0]?.used_percent}%` }}
              />
            </div>

            <div className="storage-legend">
              {storageOutput?.map((item) => (
                <div className="storage-item" key={item.label}>
                  <div className="storage-label">
                    <span className={`dot ${item.tone}`} />
                    {item.label}
                  </div>
                  <strong>{item.value}</strong>
                  <small>{item.percent}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="mini-grid">
            <div className="mini-card card">
              <IconCircle>
                <Clock3 size={25} strokeWidth={1.7} />
              </IconCircle>
              <div>
                <small>Last scan</small>
                <strong>
                  {formatDistanceToNow(
                    new Date(output?.collected_at || new Date()),
                  )}
                </strong>
                <span>8.4 GB found · 12,482 files</span>
              </div>
            </div>

            <div className="mini-card card">
              <IconCircle>
                <Activity size={25} strokeWidth={1.7} />
              </IconCircle>
              <div>
                <small>System health</small>
                <strong>{output?.health_score_msg}</strong>
                <span>No issues detected</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
