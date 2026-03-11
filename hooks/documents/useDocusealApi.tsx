 "use client";

import { useState, useCallback } from "react";
import api from "@/lib/api-client";

export interface DocumentTemplate {
  _id: string;
  assetId: string;
  templateName: string;
  templateType?: string;
  provider: string;
  providerTemplateId: string;
  createdAt: string;
  updatedAt: string;
}

export function useDocumentTemplates(assetId?: string) {
  const [templates, setTemplates] = useState<DocumentTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GET all DocuSeal documents for an asset
  const fetchTemplates = useCallback(async () => {
    if (!assetId) return;
    try {
      setIsLoading(true);
      const res = await api.get<{ data: DocumentTemplate[] }>(
        `/docuseal?assetId=${assetId}`,
      );
      setTemplates(res.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch templates");
    } finally {
      setIsLoading(false);
    }
  }, [assetId]);

  // GET single DocuSeal document by id
  const getTemplateById = useCallback(async (documentId: string) => {
    if (!documentId) throw new Error("documentId is required");
    try {
      setIsLoading(true);
      const res = await api.get<{ data: DocumentTemplate }>(
        `/docuseal/${documentId}`,
      );
      setError(null);
      return res.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to get template");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // POST create new DocuSeal document
  const createTemplate = useCallback(
    async (payload: {
      providerTemplateId: string;
      templateName: string;
      provider?: string;
    }) => {
      if (!assetId) throw new Error("assetId is required");
      try {
        setIsLoading(true);
        const res = await api.post<{ data: DocumentTemplate }>(
          `/docuseal?assetId=${assetId}`,
          {
            ...payload,
            provider: payload.provider || "docuseal",
          },
        );
        setTemplates((prev) => [...prev, res.data.data]);
        setError(null);
        return res.data.data;
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to create template");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [assetId],
  );

  // PUT update DocuSeal document
  const updateTemplateById = useCallback(
    async (
      documentId: string,
      payload: Partial<
        Pick<DocumentTemplate, "templateName" | "providerTemplateId">
      >,
    ) => {
      if (!documentId) throw new Error("documentId is required");
      try {
        setIsLoading(true);
        const res = await api.put<{ data: DocumentTemplate }>(
          `/docuseal/${documentId}`,
          payload,
        );
        setTemplates((prev) =>
          prev.map((t) => (t._id === documentId ? res.data.data : t)),
        );
        setError(null);
        return res.data.data;
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to update template");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // DELETE DocuSeal document by id
  const deleteTemplateById = useCallback(async (documentId: string) => {
    if (!documentId) return;
    try {
      setIsLoading(true);
      await api.delete(`/docuseal/${documentId}`);
      setTemplates((prev) => prev.filter((t) => t._id !== documentId));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete template");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // DELETE all DocuSeal documents for an asset
  const deleteAllTemplatesForAsset = useCallback(async () => {
    if (!assetId) return;
    try {
      setIsLoading(true);
      await api.delete(`/docuseal/?assetId=${assetId}`);
      setTemplates([]);
      setError(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to delete all templates for asset",
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [assetId]);

  return {
    templates,
    isLoading,
    error,
    fetchTemplates,
    getTemplateById,
    createTemplate,
    updateTemplateById,
    deleteTemplateById,
    deleteAllTemplatesForAsset,
  };
}

