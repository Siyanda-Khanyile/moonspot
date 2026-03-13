import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface HealthStatus {
  status: string;
  version: string;
  timestamp: string;
  service: string;
}

export function StatusPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/health.json');
        const data = await response.json();
        setHealth(data);
      } catch (error) {
        console.error('Health check failed:', error);
        setHealth({
          status: 'unhealthy',
          version: 'unknown',
          timestamp: new Date().toISOString(),
          service: 'moonspot-frontend'
        });
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'unhealthy':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'unhealthy':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1040] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1040] p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Moonspot Status</h1>
          <p className="text-gray-300">System health and deployment information</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {health && getStatusIcon(health.status)}
              Service Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Status</span>
              <Badge className={getStatusColor(health?.status || 'unknown')}>
                {health?.status || 'Unknown'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Version</span>
              <span className="text-white font-mono">{health?.version || 'Unknown'}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Service</span>
              <span className="text-white">{health?.service || 'Unknown'}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Last Updated</span>
              <span className="text-white text-sm">
                {health?.timestamp ? new Date(health.timestamp).toLocaleString() : 'Unknown'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Environment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Environment</span>
              <Badge variant="outline" className="text-white border-gray-600">
                {import.meta.env.VITE_APP_ENV || 'development'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Build Mode</span>
              <Badge variant="outline" className="text-white border-gray-600">
                {import.meta.env.MODE}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Base URL</span>
              <span className="text-white font-mono text-sm">
                {import.meta.env.BASE_URL}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Back to App
          </a>
        </div>
      </div>
    </div>
  );
}