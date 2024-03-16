import Image from "next/image";
import TablePage from "../components/TablePage/TablePage";
import { Toaster } from "../components/ui/toaster";

export default function Home() {
  return (
  <>
    <TablePage/>
    <Toaster/>
  </>
  );
}
