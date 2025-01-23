import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/Dialog";
import { useToast } from "../../components/ui/Toast";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Text } from "lucide-react";
import {
  useCreateNews,
  useDeleteNews,
  useGetNews,
  useUpdateNews,
} from "../../lib/react_query/queriesAndMutations";
import { formatReadableTime } from "../../lib/utils";
import { newsLetterFormSchema } from "../../lib/validation";
import GenericFileUploader from "../../components/shared/GenericFileUploader";

function NewsLetterForm({ news, action, newsSubmit }) {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutateAsync: createNewsLetter, isPending: isCreating } =
    useCreateNews();
  const { mutateAsync: updateNewsLetter, isPending: isUpdating } =
    useUpdateNews();

  // Form State
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsLetterFormSchema),
    defaultValues: {
      title: news ? news?.title : "",
      file: [],
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    if (news && action === "Update") {
      const updatedNews = await updateNewsLetter({
        ...data,
        id: news?.$id,
        fileId: news?.fileId,
        fileUrl: news?.fileUrl,
      });

      if (!updatedNews) {
        toast({
          title: "Update Failed!",
          description: "There was an error in updating. Please try again.",
        });
      } else {
        toast({
          title: "Update Successful!",
          description: "Your newsletter has been updated successfully. 🎉",
        });
      }
      return navigate(`/admin/newsletter`);
    }
    const newNews = await createNewsLetter(data);

    if (!newNews) {
      toast({
        title: "Upload Failed!",
        description: "There was an error in Uploading. Please try again.",
      });
    } else {
      toast({
        title: "Upload Successful!",
        description: "Your newsletter has been uploaded successfully. 🎉",
      });
      navigate("/admin/newsletter");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full px-3 pb-10"
    >
      {/* Add Title */}
      <div className="px-3 ">
        <label className="block text-neutral-black font-semibold">Title</label>
        <Input
          type="text"
          id="title"
          placeholder="Title of the Newsletter"
          icon={<Text />}
          {...register("title")}
        />
      </div>

      {/* Add Newsletter */}
      <div className="px-3">
        <label className="block text-neutral-black font-semibold">
          Add Newsletter
        </label>
        <GenericFileUploader
          onFileChange={(file) => setValue("file", file)}
          initialFileUrl={news?.imageUrl}
          acceptedFileTypes={{ "application/pdf": [".pdf"] }}
          enableImageCropping={false}
          cropAspectRatio={null}
          cropperStyle={{}}
        />
        {errors.image && (
          <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 items-center justify-end mb-14 md:mb-0">
        <Button type="submit" disabled={isCreating || isUpdating}>
          {isCreating || (isUpdating && "Validating...  ")} {action}
        </Button>
      </div>
    </form>
  );
}

function FormDialog({ news, action }) {
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    setIsDialogOpen(false);
  }, [location]);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <div
          className="rounded-md font-semibold text-sm flex gap-3 items-center justify-center text-center bg-primary text-neutral-white hover:bg-primary/85 px-4 py-2"
          onClick={() => setIsDialogOpen(true)}
        >
          {action}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Newsletters</DialogTitle>
          <DialogDescription>Form to upload Newslettes</DialogDescription>
        </DialogHeader>
        <hr className="w-full" />
        <NewsLetterForm
          action={action}
          news={news}
          newsSubmit={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

const ControlNewsletters = () => {
  const navigate = useNavigate();
  const {
    data: newsLetters,
    isPending: isNewsLoading,
    isError: isNewsError,
  } = useGetNews();

  const { mutateAsync: deleteNewsLetter, isPending } = useDeleteNews();

  const hasnewsLetters =
    newsLetters?.documents && newsLetters.documents.length > 0;

  return (
    <div className="default-container">
      <h2 className="w-full flex-center text-2xl font-extrabold pt-5">
        Control Newsletters
      </h2>
      <div className="w-full flex-center py-10">
        <FormDialog action={"Create"} />
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">Index</th>
              <th className="border px-2 py-1">Read</th>
              <th className="border px-2 py-1">Update</th>
              <th className="border px-2 py-1">Delete</th>
              <th className="border px-2 py-1">Document Id</th>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">File Id</th>
              <th className="border px-2 py-1">File Url</th>
              <th className="border px-2 py-1">Created Time</th>
              <th className="border px-2 py-1">Updated Time</th>
            </tr>
          </thead>
          <tbody>
            {newsLetters.documents?.map((news, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/newsletter/${news.$id}`)}
                    disabled={isPending}
                  >
                    Read
                  </Button>
                </td>
                <td className="border px-2 py-1">
                  {<FormDialog action={"Update"} news={news} />}
                </td>
                <td className="border px-2 py-1">
                  <Button
                    variant="destructive"
                    onClick={() =>
                      deleteNewsLetter({
                        newsId: news.$id,
                        fileId: news.fileId,
                      })
                    }
                    disabled={isPending}
                  >
                    Delete
                  </Button>
                </td>
                <td className="border px-2 py-1">{news.$id}</td>
                <td className="border px-2 py-1">{news.title}</td>
                <td className="border px-2 py-1">{news.fileId}</td>
                <td className="border px-2 py-1">{news.fileUrl}</td>
                <td className="border px-2 py-1">
                  {formatReadableTime(news.$createdAt)}
                </td>
                <td className="border px-2 py-1">
                  {formatReadableTime(news.$updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ControlNewsletters;
