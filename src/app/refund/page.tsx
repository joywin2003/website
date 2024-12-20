"use client"

import Container from "@/components/shared/container";
import { Text } from "@/components/shared/text";
import {legalInfo} from "@/data/legal-info";
import { cn } from "@/lib/utils";

export default function Refund() {
    return (
        <Container className="mx-auto">
            <div className="py-4 mx-6  sm:mx-12 space-y-4 pt-32 text-white">
                <Text variant="h1" className={cn("text-5xl")}>
                    Refund Policy
                </Text>
                {legalInfo.Refund.map((refund, index) => (
                    <div key={index}>
                        <Text variant="h2" className={cn("text-2xl")}>
                            {refund.title}
                        </Text>
                        <p dangerouslySetInnerHTML={{ __html: refund.description }}></p>
                    </div>
                ))}
            </div>
        </Container>
    );
}