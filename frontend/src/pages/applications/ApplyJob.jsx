import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyToJob, selectApplicationLoading, selectApplicationError, selectApplicationMessage, clearError, clearMessage } from "../../redux/slices/applicationSlice";
import { useProfile } from "../../redux/hooks/useProfile";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectApplicationLoading);
  const error = useSelector(selectApplicationError);
  const message = useSelector(selectApplicationMessage);
  const { profile, user, handleGetProfile } = useProfile();

  const [form, setForm] = useState({
    coverLetter: "",
    useSavedResume: false,
    resume: null,
  });
  
  const savedResumeUrl = useMemo(() => {
    const r = profile?.profile?.resume;
    if (r && typeof r === "object") return r.resumeURL || null;
    return null;
  }, [profile]);
  

  useEffect(() => {
    if (!profile && handleGetProfile) {
      handleGetProfile();
    }
  }, [profile, handleGetProfile]);

  useEffect(() => {
    const hasSavedResume = Boolean(savedResumeUrl);
    setForm((prev) => ({ ...prev, useSavedResume: hasSavedResume }));
  }, [savedResumeUrl]);

  useEffect(() => {
    // Cleanup messages on unmount
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      e.target.value = "";
      setForm((prev) => ({ ...prev, resume: null }));
      return;
    }
    setForm((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasSavedResume = Boolean(savedResumeUrl);
    if (!form.useSavedResume && !form.resume) {
      alert("Please upload your PDF resume or select 'Use saved resume'.");
      return;
    }
    if (form.useSavedResume && !hasSavedResume) {
      alert("No saved resume found in your profile. Please upload a PDF.");
      return;
    }

    const applicationData = {
      coverLetter: form.coverLetter,
      resume: form.useSavedResume ? undefined : form.resume,
    };
    const result = await dispatch(applyToJob({ jobId, applicationData }));
    if (applyToJob.fulfilled.match(result)) {
      navigate("/my-applications", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Apply to Job</h1>
          <p className="text-gray-400">You're applying for Job ID: {jobId}</p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={form.coverLetter}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-100 focus:ring-2 focus:ring-[#34aeeb] focus:border-transparent min-h-[140px]"
                placeholder="Write a concise cover letter (min 20 characters)."
                minLength={20}
              />
              <p className="text-xs text-gray-500 mt-1">Tip: Share relevant experience and motivation in 1-2 short paragraphs.</p>
              <div className="flex items-center justify-between mt-1 text-xs">
                <span className="text-gray-500">Minimum 20 characters</span>
                <span className={form.coverLetter.length >= 20 ? "text-green-400" : "text-red-400"}>
                  {form.coverLetter.length} characters
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="useSavedResume"
                type="checkbox"
                name="useSavedResume"
                checked={form.useSavedResume}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-[#34aeeb] focus:ring-[#34aeeb]"
              />
              <label htmlFor="useSavedResume" className="text-sm text-gray-300">Use my saved resume from profile</label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload Resume (PDF)</label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full text-gray-300"
                disabled={form.useSavedResume}
                required={!form.useSavedResume}
              />
              <p className="text-xs text-gray-500 mt-1">Only PDF files are accepted. If you have a saved resume, you can skip uploading.</p>
              {form.useSavedResume && (
                savedResumeUrl ? (
                  <p className="text-xs text-green-400 mt-1">
                    Using saved resume from your profile —
                    <a
                      href={savedResumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-[#34aeeb] hover:text-[#2a8bc7] ml-1"
                    >
                      Preview
                    </a>
                  </p>
                ) : (
                  <p className="text-xs text-red-400 mt-1">No saved resume found. Please uncheck and upload a PDF.</p>
                )
              )}
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
            {message && (
              <div className="text-green-400 text-sm">{message}</div>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#34aeeb] hover:bg-[#2a8bc7] text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;