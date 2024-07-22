"use client";

import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/route";
import { DateToUTCDate, GetFormatterForCurrency } from "@/lib/helpers";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { ReactNode, useCallback, useMemo } from "react";
import SkeletonWrapper from "@/components/SkeletonWrapper";
import { TrendingDown, TrendingUp, Wallet, Wallet2Icon } from "lucide-react";
import CountUp from "react-countup";
import { Card } from "@/components/ui/card";

interface Props {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}

function StatsCards({ from, to, userSettings }: Props) {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      fetch(
        `/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`
      ).then((res) => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const income = statsQuery.data?.income || 0;
  const expense = statsQuery.data?.expense || 0;

  const balance = income - expense;
  return (
    <div className="relative flex  w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={income}
          title="Income"
          icon={
            <TrendingUp
              className="h-12 w-12 items-center rounded-lg
          text-green-600 bg-green-500/10"
            />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={expense}
          title="Expense"
          icon={
            <TrendingDown
              className="h-12 w-12 items-center rounded-lg
          text-red-600 bg-red-500/10"
            />
          }
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          formatter={formatter}
          value={balance}
          title="Balance"
          icon={
            <Wallet2Icon
              className="h-12 w-12 items-center rounded-lg
          text-purple-600 bg-purple-500/10"
            />
          }
        />
      </SkeletonWrapper>
    </div>
  );
}

export default StatsCards;

const StatCard = ({
  formatter,
  value,
  title,
  icon,
}: {
  formatter: Intl.NumberFormat;
  icon: ReactNode;
  title: String;
  value: number;
}) => {
  const formatFn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter]
  );

  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flex flex-col items-start gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatFn}
          className="text-xl"
        />
      </div>
    </Card>
  );
};
