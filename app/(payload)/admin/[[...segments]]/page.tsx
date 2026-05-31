import { RootPage } from '@payloadcms/next/views'
import React from 'react'
import config from '../../../../payload.config'
// @ts-ignore
import { importMap } from '../importMap.js'

type PageProps = {
  params: Promise<{
    segments?: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

const Page = async (props: PageProps) => {
  const { params, searchParams } = props
  return <RootPage params={params} searchParams={searchParams} config={config} importMap={importMap} />
}

export default Page
