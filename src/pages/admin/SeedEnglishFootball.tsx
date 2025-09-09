import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const SeedEnglishFootball: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("seed-english-football", { body: {} });
      if (error) throw error;
      setResult(data);
      toast({ title: "Seeding complete", description: `Inserted ${data?.inserted_count || 0} clubs.` });
    } catch (e: any) {
      toast({ title: "Error seeding", description: e?.message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto max-w-3xl py-10">
      <Helmet>
        <title>Seed English Football Clubs | Admin</title>
        <meta name="description" content="Seed England professional football clubs with AI enrichment." />
        <link rel="canonical" href="/admin/seed-english-football" />
      </Helmet>

      <Card>
        <CardHeader>
          <CardTitle>Seed English Football Clubs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">This will remove existing English football teams and insert the provided lists. Sport is set to Football, country to England, level to Professional. City and website are enriched with AI when possible.</p>
          <Button onClick={onSeed} disabled={loading}>
            {loading ? "Seeding..." : "Run Seeding"}
          </Button>

          {result && (
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Total requested: {result.total_requested}</div>
              <div>Inserted: {result.inserted_count}</div>
              <div>Deleted: {result.deleted_team_ids?.length || 0}</div>
              {result.errors?.length ? (
                <details>
                  <summary>View errors ({result.errors.length})</summary>
                  <ul className="list-disc pl-5">
                    {result.errors.map((e: any, i: number) => (
                      <li key={i}>{e.name}: {e.error}</li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </div>
          )}

          <div>
            <Link to="/crm/teams" className="underline">Go to Teams</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default SeedEnglishFootball;
