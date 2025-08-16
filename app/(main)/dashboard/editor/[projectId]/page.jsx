"use client";

import { useParams } from "next/navigation";

export default function ProjectEditorPage() {
	const params = useParams();
	const projectId = params?.projectId;
	console.log('[EditorPage] useParams:', params);
	console.log('[EditorPage] projectId:', projectId);

	return (
		<div style={{ padding: 32 }}>
			<h1>Project Editor</h1>
			<p>Project ID: {projectId || "undefined"}</p>
			<p>This is a sample dynamic editor page for your project.</p>
		</div>
	);
}
