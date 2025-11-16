import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function GridReference() {
  return (
    <Card className="bg-black/30 backdrop-blur-md border-[#3a3d3e] text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-gray-400">Grid Reference</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm font-medium">SECTOR-7</div>
        <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-[#3a3d3e]">
          <div className="font-medium text-gray-300">Espoo, Finland</div>
          <div className="font-mono text-gray-400">60.157093649895806, 24.62931446142913</div>
        </div>
      </CardContent>
    </Card>
  );
}

