'use client'

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

interface Report {
  id: number;
  postId: number;
  reporter: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

const PostReportsPage: FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/admin/reports');
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        } else {
          setError('Failed to fetch reports');
        }
      } catch (error) {
        setError('An error occurred while fetching reports');
      }
    };

    fetchReports();
  }, []);

  const handleAction = async (reportId: number, action: 'resolve' | 'dismiss') => {
    try {
      const response = await fetch(`/api/admin/reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        setReports((prevReports) =>
          prevReports.map((report) =>
            report.id === reportId ? { ...report, status: action === 'resolve' ? 'resolved' : 'dismissed' } : report
          )
        );
      } else {
        setError('Failed to perform action on report');
      }
    } catch (error) {
      setError('An error occurred while performing action');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Post Reports</h1>
      {error && <p className="text-red-500">{error}</p>}
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Post ID</th>
              <th className="py-2">Reporter</th>
              <th className="py-2">Reason</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="border px-4 py-2">{report.postId}</td>
                <td className="border px-4 py-2">{report.reporter}</td>
                <td className="border px-4 py-2">{report.reason}</td>
                <td className="border px-4 py-2 capitalize">{report.status}</td>
                <td className="border px-4 py-2">
                  {report.status === 'pending' && (
                    <>
                      <button
                        className="text-green-600 hover:text-green-800 mr-2"
                        onClick={() => handleAction(report.id, 'resolve')}
                      >
                        Resolve
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleAction(report.id, 'dismiss')}
                      >
                        Dismiss
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PostReportsPage;