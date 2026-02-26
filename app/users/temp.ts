type Severity = "Critical" | "High" | "Medium" | "Low";

type Vulnerability = {
    id: string;
    title: string | null;
    severity: Severity;
    package: string;
    cvss: number;
};

const VULNERABILITIES_FROM_API: Vulnerability[] = [
    {
        id: "1",
        title: "XSS in React",
        severity: "High",
        package: "react",
        cvss: 7.5,
    },
    {
        id: "2",
        title: "Prototype Pollution",
        severity: "Critical",
        package: "lodash",
        cvss: 9.8,
    },
    {
        id: "3",
        title: "SQL Injection",
        severity: "Critical",
        package: "pg",
        cvss: 10.0,
    },
    {
        id: "4",
        title: "Insecure Dependency",
        severity: "Medium",
        package: "react",
        cvss: 5.0,
    },
    { id: "5", title: null, severity: "Low", package: "express", cvss: 2.1 },
    { id: "6", title: null, severity: "Low", package: "express", cvss: 2.1 },
    {
        id: "5",
        title: "<script>alert(1)</script>",
        severity: "Low",
        package: "express",
        cvss: 2.1,
    },
    // ... imagine 500+ more items
];


const filterByTitle = (title: string) => VULNERABILITIES_FROM_API.filter((item) => {
    return item.title?.includes(title)
})

const filterBySeverity = (severity: Severity) => VULNERABILITIES_FROM_API.filter((item) => {
    return item.severity === severity
})

const mapByPackage = () => {
    const newMap = new Map<string, Vulnerability[]>()

    VULNERABILITIES_FROM_API.forEach((item) => {
        if (newMap.has(item.package)) {
            const vulnerabilities = newMap.get(item.package)
            vulnerabilities?.push(item)
        } else {
            newMap.set(item.package, [])
        }
    })

    return newMap
}